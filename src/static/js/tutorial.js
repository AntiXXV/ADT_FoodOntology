
/*
// ############
//    STEP 1
// ############
*/

// If the element with id 'link1' is clicked

	var bootstrapCSSLink = $('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-MfvZlkHCEqatNoGiOXveE8FIwMzZg4W85qfrfIFBfYc= sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">');
	var bootstrapThemeCSSLink = $('<link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/darkly/bootstrap.min.css" rel="stylesheet" integrity="sha256-IsefKVCcMUlgpXQgIMRsqbIqC6aP153JkybxTa7W7/8= sha512-mCNEsmR1i3vWAq8hnHfbCCpc6V5fP9t0N1fEZ1wgEPF/IKteFOYZ2uk7ApzMXkT71sDJ00f9+rVMyMyBFwsaQg==" crossorigin="anonymous">');
	var bootstrapJavaScriptLink = $('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha256-Sk3nkD6mLTMOF0EOpNtsIry+s1CsaqQC1rVLTAy+0yc= sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>');
    var toggleLink = $('<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.0/css/bootstrap-toggle.min.css" rel="stylesheet">');
    var toggleJSLink = $('<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.0/js/bootstrap-toggle.min.js"></script>');
	$('body').append(bootstrapCSSLink);
	$('body').append(bootstrapThemeCSSLink);
	$('body').append(bootstrapJavaScriptLink);	
$('body').append(toggleLink);
	$('body').append(toggleJSLink);
     
    
var INF; 
var tmppath;
function i(a,b){
var reasoning = $('#inference:checked').val();
var abc;
if(reasoning == "true")
	{INF = a;}
else {INF = b;}
}

$('#i_file').change( function(event) {
tmppath = URL.createObjectURL(event.target.files[0]);
var fr = document.getElementById("frame"); 

 	fr.src = tmppath;

  $("#disp_tmp_path").html(tmppath);
  
});


$('#i_submit').click(function(){

	window.parent.location=tmppath;




});


$('#link14').on('click', function(e){
	
	var sparqlR = '/sparqlR';
    var sparql = '/sparql';
	var query = $('#query14').val();
	var endpoint = 'http://localhost:5820/A4/query';
	var format = 'JSON';
	
	i(sparqlR,sparql);


	
	$.get(INF,data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
					li.append('<strong>'+v+'</strong><br/>');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktarget14').html(ul);
		} catch(err) {
			$('#linktarget14').html('Something went wrong!');
		}
		

		
	});
	
});


