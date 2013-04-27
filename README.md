Slide is a Javascript API coded in JQuery/CSS3 for HTML5 page.

First of all you have to add in your html page a section with the id 'container' and you add your articles into this section.
To initialize the Slide you just have to call 'new Slide(param)' between script tag at the end of your page.
'Param' is the name of the style. The different values that 'param' can have : 
- cube
- slide
- rotate

Example :
<body> 
	<section id="container">
		<article>Slide 1</article>
		<article>Slide 2</article>
		...
	</section>
	<script type="text/javascript">
		new Slide('rotate');
	</script>
</body>

Copyright (C) 2013 Anthony Coulon
