require.def("sudoku/appui/components/numberselector",
	[
		"antie/widgets/container",
		"antie/widgets/label",
		"antie/widgets/button",
		"antie/widgets/grid"
	],
	function (Container, Label, Button, Grid) {
		return Container.extend({
			init: function() {
				var self = this;

				this._super("numberselector");

				this.addClass("numberselector");

				var grid = new Grid("numberGrid", 3, 3);

				for(var i = 0; i < 3; i++) {
					for(var j = 0; j < 3; j++) {
						var button = new Button();
						button.appendChildWidget(new Label(i*3 + j + 1));
						button.addClass("numberSelectorButton");
						grid.setWidgetAt(j, i, button);
					}
				}

				this.appendChildWidget(grid);

				this.addClass("hidden");
			},

		})
	}
);