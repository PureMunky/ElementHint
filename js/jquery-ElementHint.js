$(function() {
	ElementHint.Init()
	//ElementHint.EditMode(true)
});

var ElementHint = (function($) {
	
	// Grabs the xml from a the file that contains all of the Hint META data. //Default: ElementHint.xml
	var getHints = function () {
		$.ajax({
			url: 'ElementHint.xml',
			success: function (d) {
				$(d).find('hint').each(function (i, e) {
					_addHintToElement(_parseHint(e))
				})
			}
		})
	}
	
	// Add a Hint's HTML to the DOM for display includes events for that hint.
	var _addHintToElement = function (inHint) {
		$ElementGettingHint = $('#' + inHint.elementID)
		
		$ElementGettingHint.before(_buildHint(inHint))
		
		
		// Create Events
		$ElementGettingHint.on('hover.ElementHint', function () {
			$('#' + inHint.hintID).show(300, 'swing')
		})
		
		$('#' + inHint.hintID + '_Close').on('click.ElementHint', function() {
			$('#' + inHint.hintID).hide(300, 'swing')
		})
	}
	
	// Parses the XML to create a Hint object.
	var _parseHint = function (inHintXML) {
		return {
			title: $(inHintXML).find('title').text(),
			body: $(inHintXML).find('body').text(),
			elementID: $(inHintXML).find('elementID').text(),
			hintID: 'ElementHint' + $(inHintXML).find('elementID').text()
		}
	}

	// Creates the HTML that is used to display a Hint on the page.
	var _buildHint = function (inHint) {
		$hint = $('<div id="' + inHint.hintID + '" style="position: absolute; background-color: #FFFFFF; border: 1px solid #333333; display: none;"></div>')
		$hint.append('<div>' + inHint.title + '</div>')
		$hint.append('<div>' + inHint.body + '</div>')
		$hint.append('<div><a href="javascript:void(0);" id="' + inHint.hintID + '_Close">Close</a></div>')
		return $hint
	}
	
	return {
		// Initiates the use of the ElementHint functionality. Sets defaults for the plugin. 
		Init: function() {
			getHints()
		},
		
		// Turns on/off the EditMode of ElementHint, allowing a user to create new hits from the page they're viewing.
		EditMode: function(TurnOn){
			if(TurnOn) {
				$('[id]')
					.css('border', '2px solid #FF0000')
					.data('HintElement', true)
					.each(function(i, e) {
						var $Editor = $('<div>Editor Design</div>')
							.data('HintElementID', $(e).attr('id'))
					})
			} else {
				//do nothing or handle non-ID based elements.
			}
		}
	}
})(jQuery)
