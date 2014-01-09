function contents(active) {	
	var base = "aracyc";
	var title = "AraCyc Tutorial";
	var intro = "Introduction to AraCyc, an Arabidopsis Metabolic Pathways Database";
	var page1 = "Finding Pathways, Genes, Compounds and Reactions in AraCyc";
	var page2 = "Understanding the AraCyc Detail Pages";
	var page3 = "Browsing Pathways, Genes, Compounds and Reactions";
	var page4 = "Using the Metabolic Map Overview";
	var page5 = "Displaying Gene Expression, Proteomic, Metabolomic and other Data in the Omics Viewer";
	var page6 = "Evidence Codes and Their Usage in AraCyc";
	var page7 = "QuickTime Movies";

	document.write("<tr><td width =\'200 px\' style=\'background-color: #CCCCCC\' valign=\'top\' cellpadding=\'12\'>")
	document.write("<h1 class=\'menu\'><a name=\'top\'></a>"+title+"</h1><ul>")
if (active=="intro") {
	document.write("<li class=\'on\'>"+intro+"</li>")
}
	else {
	document.write("<li><a href=\'" + base +"_intro.jsp\' class=\'menu\'>"+intro+"</a></li>")
}

if (active=="page1") {
        document.write("<li class=\'on\'>"+page1+"</li>")
}
        else {
        document.write("<li><a href=\'" + base +"1.jsp\' class=\'menu\'>"+page1+"</a></li>")
}

if (active=="page2") {
        document.write("<li class=\'on\'>"+page2+"</li>")
}
        else {
        document.write("<li><a href=\'" + base +"2.jsp\' class=\'menu\'>"+page2+"</a></li>")
}

if (active=="page3") {
        document.write("<li class=\'on\'>"+page3+"</li>")
}
        else {
        document.write("<li><a href=\'" + base +"3.jsp\' class=\'menu\'>"+page3+"</a></li>")
} 

if (active=="page4") {
        document.write("<li class=\'on\'>"+page4+"</li>")
}
        else {
        document.write("<li><a href=\'" + base +"4.jsp\' class=\'menu\'>"+page4+"</a></li>")
}

if (active=="page5") {
        document.write("<li class=\'on\'>"+page5+"</li>")
}
        else {
        document.write("<li><a href=\'" + base +"5.jsp\' class=\'menu\'>"+page5+"</a></li>")
}

if (active=="page6") {
        document.write("<li class=\'on\'>"+page6+"</li>")
}
        else {
        document.write("<li><a href=\'" + base +"6.jsp\' class=\'menu\'>"+page6+"</a></li>")
}

if (active=="page7") {
        document.write("<li class=\'on\'>"+page7+"</li>")
}
        else {
        document.write("<li><a href=\'" + base +"7.jsp\' class=\'menu\'>"+page7+"</a></li>")
}

	document.write("</ul></td>")
}
