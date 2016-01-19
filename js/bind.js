
'use strict';

var $$ = {
	bind: (data) => {
		$('[bind]').each(function() {
			var prop = $(this).attr('bind');
			if(prop.indexOf('.') < 0) {
				$(this).text(data[prop]);
			}
		});


		//Not consider nested loop
		$('[repeat]').each(function() {
			var repeat = $(this).attr('repeat');
			var params = repeat.trim().split(' ');
			var iter = params[0];
			var arr = data[params[2]];

			//Because jquery after method will put the latter before
			arr.reverse();

			for(let i = 0;i < arr.length;i++) {
				var clonedNode = $(this).clone();
				clonedNode.removeAttr('repeat');
				//Make it easy to find to remove
				clonedNode.attr('repeated', '');
				clonedNode.find('[bind]').each(function() {
					var bind = $(this).attr('bind');
					var splitedArr = bind.split('.');
					var curIter = splitedArr[0];
					var prop = splitedArr[1];
					if(iter === curIter) {
						$(this).text(arr[i][prop]);
					}
					$(this).removeAttr('bind');
				});
				$(this).after(clonedNode);
			}

			//Keep the template but not visible
			$(this).css('display', 'none');
		})
	}
};