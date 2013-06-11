require.def("sudoku/appui/components/game",
	[
		"antie/widgets/component",
		"antie/widgets/label",
		"antie/widgets/grid",
		"antie/widgets/button",
		"antie/events/keyevent"
	],
	function (Component, Label, Grid, Button, KeyEvent) {
		return Component.extend({
			init: function () {
				var self = this;

				this._super("game");

				this.appendChildWidget(new Label("title", "Sudoku on TAL"));

				this._gameGrid = new Grid("gamegrid", 9, 9);

				for(var i = 0; i < 9; i++) {
					for(var j = 0; j < 9; j++) {
						this._gameGrid.setWidgetAt(i, j, new Button());
						this._gameGrid.getWidgetAt(i, j).appendChildWidget(new Label("0"));
					}
				}

				this.appendChildWidget(this._gameGrid);

				this.addEventListener('keydown', function(e) { self._onKeyDown(e); });
	
			},

			_onKeyDown: function(e) {
				// Only handle numeric keypresses
				if(e.keyCode >= KeyEvent.VK_0 && e.keyCode <= KeyEvent.VK_9) {
					e.stopPropagation();
					this._gameGrid._activeChildWidget._childWidgetOrder[0].setText(e.keyChar);
				} else {
					return;
				}
			}
		});
	}
);