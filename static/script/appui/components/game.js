require.def("sudoku/appui/components/game",
	[
		"antie/widgets/component",
		"antie/widgets/label",
		"antie/widgets/grid",
		"antie/widgets/button"
	],
	function (Component, Label, Grid, Button) {
		return Component.extend({
			init: function () {
				this._super("game");

				this.appendChildWidget(new Label("title", "Sudoku on TAL"));

				var gameGrid = new Grid("gamegrid", 9, 9);

				for(var i = 0; i < 9; i++) {
					for(var j = 0; j < 9; j++) {
						gameGrid.setWidgetAt(i, j, new Button());
					}
				}

				this.appendChildWidget(gameGrid);
			}
		});
	}
);