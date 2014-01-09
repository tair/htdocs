use perlcyc;

my $cyc = perlcyc -> new ("ARA");

$myframe = $cyc -> find_indexed_frame("At1g01050", "|Genes|");

print "$myframe\n"; 
