$(function() {
	ElementHint.init();
	ElementHint.EditMode(true);
});

var ElementHint = (function($) {
	var getHints = function () {
		$.ajax({
			url: 'path/to/xml.xml',
			success: function (d) {
				//woot
			}
		});
	};
	
	return {
		init: function() {
			getHints()
		},
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
})(jQuery);
