#!/usr/local/bin/perl
foreach $year (1964..1990) {
        chdir $year;
        foreach $file (<*>) {
                symlink ("../$year/$file", "../allyears/$file");
                }
        chdir "..";
        }
