#!/usr/local/bin/perl

use perlcyc;

my $cyc = perlcyc -> new();

$cyc -> select_organism("ARA");

my @reactions = $cyc -> all_rxns();
foreach $reaction (@reactions) {
  $common_name = $cyc -> get_slot_value($reaction, "in-pathway");
  print "$reaction\t$common_name\n";            
}



  
