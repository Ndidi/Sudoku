require.def("sudoku/appui/components/gamegrid",
	[
		"antie/widgets/component",
		"antie/widgets/grid",
		"antie/widgets/button"
	],
	function (Component, Grid, Button) {
		return Grid.extend({
			init: function() {
				var self, grid;

				self = this;

				grid = new Grid("gamegrid", 9, 9);

				for(var i = 0; i < 9; i++) {
					for(var j = 0; j < 9; j++) {
						this.setWidgetAt(i, j, new Button());
					}
				}

			}
		});
	}
);