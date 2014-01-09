function contents(active) {	
	document.write("<tr><td width =\'200 px\' style=\'background-color: #CCCCCC\' valign=\'top\' cellpadding=\'12\'>")
	document.write("<ul><h1 class=\'menu\'><a name=\'top\'></a>Using TAIR's Microarray Resources</h1>")
if (active=="intro") {
	document.write("<li class=\'on\'>Introduction</li>")
}
	else {
	document.write("<li><a href=\'micro_intro.jsp\' class=\'menu\'>Introduction</a></li>")
}
if (active=="micro1") {
	document.write("<li class=\'on'\>What data and tools are available</li>")
}
	else {
	document.write("<li><a href=\'micro1.jsp\' class=\'menu\'>What data and tools are available</a></li>")
}

if (active=="micro2") {
        document.write("<li class=\'on'\>How to find microarray experiments</li>")
}
        else {
        document.write("<li><a href=\'micro2.jsp\' class=\'menu\'>How to find microarray experiments</a></li>")
}

if (active=="micro3") {
        document.write("<li class=\'on'\>How to find information about expression of specific genes</li>")
}
        else {
        document.write("<li><a href=\'micro3.jsp\' class=\'menu\'>How to find information about expression of specific genes</a></li>")
}

if (active=="micro4") {
        document.write("<li class=\'on'\>Finding arrays that contain a gene or set of genes</li>")
}
        else {
        document.write("<li><a href=\'micro4.jsp\' class=\'menu\'>Finding arrays that contain a gene or set of genes</a></li>")
}

if (active=="micro5") {
        document.write("<li class=\'on'\>Finding genes that are similarly expressed in multiple experiments</li>")
}
        else {
        document.write("<li><a href=\'micro5.jsp\' class=\'menu\'>Finding genes that are similarly expressed in multiple experiments</a></li>")
}

if (active=="micro6") {
        document.write("<li class=\'on'\>Finding potential regulatory sequences in co-clustered genes</li>")
}
        else {
        document.write("<li><a href=\'micro6.jsp\' class=\'menu\'>Finding potential regulatory sequences in co-clustered genes</a></li>")
}

if (active=="micro7") {
        document.write("<li class=\'on'\>How to download and view microarray data</li>")
}
        else {
        document.write("<li><a href=\'micro7.jsp\' class=\'menu\'>How to download and view microarray data</a></li>")
}
/*
if (active=="micro8") {
        document.write("<li class=\'on'\>Quicktime movies</li>")
}
        else {
        document.write("<li><a href=\'micro8.jsp\' class=\'menu\'>Quicktime movies</a></li>")
}
*/

	document.write("</ul></td>")
}
