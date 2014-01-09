#!/usr/local/bin/perl -w

#This script starts from a list of genes (here : pep.orth.sep01.constitutive_list, buth change this name if wanted) and looks up the associated go ids, it produces a number of files: the most important being go-ids, a list of associated go ids and GO-ids-with-refs, a list of go ids with definitions,... and a list of the associated genes in the original file.  Questions ?  Mark Lambrecht at TAIR.  curator@acoma.stanford.edu 

#Note : the relationship gene to go_ids is many-to-many !

use DBI;
use strict;
use Data::Dumper;


print "What is the file with the list of genes you want GO-id associations for ?\nPlease make sure that that the file contains the gene loci in the first column, the rest of the file will be disregarded.\n";
print "Make sure that file GOformattedfile.101901-edited.squashed is in this directory or a similar, recent file (unique gene -go associations)\n";
my $source_file = <STDIN>;
chomp($source_file);

#open the annotated genes-to-GO file and stores in 2 hashes gene-go_ids and go_id-genes
open (ASSOCIATION, "</opt/tairPerlLib/locus2go/GOformattedfile.101901-edited.squashed") or die "can't open file /opt/tairPerlLib/locus2go/GOformattedfile.101901-edited.squashed:$!\n";

#association stores gene to go-ids
my %association = ();

#inverse_association hash stores go_ids to genes
my %inverse_association = ();

#category hash to store key as go-id and value as go category
my %category = ();

while (<ASSOCIATION>)
{
    chomp;
    my @fields=split /\t/;
    $fields[2] = uc($fields[2]);
    my $value_aryref = [];
    my $inverse_value_aryref = [];
    $value_aryref = $association{$fields[2]};
    push @$value_aryref, [$fields[4],$fields[8]];
    $association{$fields[2]} = $value_aryref ;
    $inverse_value_aryref = $inverse_association{$fields[4]};
    push @$inverse_value_aryref, $fields[2] ;
    $inverse_association{$fields[4]} = $inverse_value_aryref;
    $category{$fields[4]} = $fields[8];
}

my $output_file_1 = "$source_file.associations_to_GO";
my $output_file_2 = "$source_file.no-associations_to_GO";

#read in the genes (LIST) and find the matching go-ids
open(LIST, "<$source_file") or die "can't open $source_file:$!\n";
open(OUT, ">$output_file_1") or die "can't open $output_file_1:$!\n";
open(NONE, ">$output_file_2") or die "can't open $output_file_2:$!\n";
open (IDS, ">go-ids") or die "can't open go-ids:$!\n";

#this hash has as keys the go-ids and as values a reference to an array containing all the gene loci; useful for last step in this script
my %later = ();

my %seen =();

while (<LIST>)
{
    chomp;
    my @fields=split /\t/;
    $fields[0] = uc($fields[0]);
#if there is, in hash association (gene-go-id) an entry for the gene, find all the go-ids and print them to OUT, otherwise print to NONE
    if (defined $association{$fields[0]})
    {
	foreach my $element (@{$association{$fields[0]}})
			       {
				   print OUT "$fields[0]\t$element->[0]\t$element->[1]\n";
#print to IDS all the go-ids separately, just to have in a file, we can use it to do the SQL statement on the PUB database, see below
				   if (! exists $seen{$element->[0]}){print IDS "$element->[0]\n"; $seen{$element->[0]} = 1}
#store in hash %later the go-ids to gene relation as value to ref to array
				   push @{$later{$element->[0]}} , $fields[0] ;
			       }
    }
    else 
    {
	print NONE "No association for gene $fields[0]\n";
    }
}

#close everything we don't need anymore
close (IDS);
close(ASSOCIATION);
close(LIST);
close(OUT);
close(NONE);



#now the real work starts ; let's find the go_ids and matching definitions in the pub database
open(GO_IDS,"<go-ids") or die "can't open go-ids:$!\n";


my $dbh=DBI->connect('dbi:mysql:database=pub;host=tesuque.stanford.edu', 'pubuser', 'bengt', {RaiseError => 0, PrintError => 1});


my $sql = qq{SELECT external_id, name, definition, reference 
	     FROM term 
	     WHERE external_id = ? };
my $sth=$dbh->prepare($sql);

open(OUT,">GO-ids-with-refs") or die "can't open GO-ids-with-refs:$!\n";

print OUT "GO_ID\tGO_CATEGORY\tNAME\tDEFINITION\tREFERENCE\tGENE_LOCI\n";
print OUT "NA = not available\n";

#bind the go_ids to the SQL statement
while (<GO_IDS>)
{
    chomp;
    print "$_\n";
    $sth->execute($_) or die $sth->errstr;
    while (my $hash_ref  = $sth -> fetchrow_hashref())
    {
#make sure that if value was NULL in database, it is printed as not available (NA)
	foreach my $key (keys %$hash_ref){$hash_ref->{$key}=$hash_ref->{$key}||"NA";}

#print to OUT the go_ids with definition, reference,...
				 print OUT join("\t", $_, $category{$_}, $hash_ref->{name}, $hash_ref->{definition},$hash_ref->{reference});
	print OUT "\t";
#...add all the genes annotated to this go-id (and that are in the original pep.orth.sep01.definitive_list in this case); use the %later hash constructed higher
	foreach my $element (@{$later{$_}})
			     {
				 print OUT "$element,";

			     }
	print OUT "\n";

    }
}


close(OUT);
close(GO_IDS);

#This part produces the gene loci with 3 columns : function, process and cellular component GO descriptions for each gene.

open (IN, "<GO-ids-with-refs") or die "can't open GO-ids-with-refs:$!\n";
open (IN2, "<$output_file_1") or die "can't open associations-wheat-GO:$!\n";


open (OUT, ">list-category_associations") or die "can't open list-category_associations:$!\n";


my %associated=();
while (<IN>)
{
    chomp;
    my @fields =split/\t/;
    $associated{$fields[0]} = $fields[2] ;
}


my %seen2;
my (@f, @p, @c);
my $gene_locus;

while(<IN2>)
{
    chomp;
    my @fields=split/\t/;
    $gene_locus = $fields[0];
    if (! $seen2{$gene_locus}){
	print OUT "\t", join(",", @f), "\t", join(",", @p), "\t", join(",", @c),"\n";
	@f=();
	@p=();
	@c=();
	print OUT "$gene_locus";
	$seen2{$gene_locus} = 1;
    }	
	if ($fields[2] eq 'F'){push @f, $associated{$fields[1]}}
	if ($fields[2] eq 'P'){push @p, $associated{$fields[1]}}
	if ($fields[2] eq 'C'){push @c, $associated{$fields[1]}}
    
}


print "Finished !\n";
print "File $source_file was your original file\n";
print "File $output_file_1 has the genes associated to GO's\n";
print "File $output_file_2 has the genes not associated.\n";
print "File go-ids contains a list of unique associated GO ids\n";
print "File GO-ids-with-refs contains the ids with their definition and in the last column all the associated genes from $source_file.\n";
print "File list-category_associations contains a file with column 1, the gene locus; column 2 the molecular functions descriptions; col 3 biological process and col 4 the cellular component!\n";
print "Thanks and goodbye\n\n**************************************\n";
