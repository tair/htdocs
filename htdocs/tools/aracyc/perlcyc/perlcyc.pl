#!/usr/local/bin/perl

use perlcyc;
use Data::Dumper;
my $cyc = perlcyc -> new("ara");

#$cyc -> select_organism("ara");

my @pathways = $cyc -> all_pathways();

print "I have ", scalar(@pathways) , " pathways.\n";
foreach $pathway (@pathways) {
  print "Working on pathway $pathway\n";
  if ($pathway) {
    print "Now pathway: $pathway\n";
    $name = $cyc -> get_slot_value ($pathway, "common-name");
    print "\n\nPATHWAY: $name\n\n";
    @reactions = $cyc -> get_reaction_list ($pathway);
    foreach $reaction (@reactions) {
      if (!$reaction) { next; }
      print "$reaction\n";
      my ($reactants, $products) =
	$cyc -> reaction_reactants_and_products($reaction, $pathway);
      print Dumper(@randp);
      foreach my $substrate (@$reactants) {
	print "SUBSTRATE: $substrate\n";
      }
      foreach my $product (@$products) {
	print "PRODUCT: $product\n";
      }
    }
  }
}


  
