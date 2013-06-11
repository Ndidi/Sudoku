require.def("sudoku/appui/components/game",
	[
		"antie/widgets/component",
		"antie/widgets/label",
		"sudoku/appui/components/gamegrid"
	],
	function (Component, Label, GameGrid) {
		return Component.extend({
			init: function () {
				this._super("game");

				this.appendChildWidget(new Label("title", "Sudoku on TAL"));

				var gameGrid = new GameGrid();
				this.appendChildWidget(gameGrid);
			}
		});
	}
);