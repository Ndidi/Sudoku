require.def("sudoku/appui/components/numberselector",
	[
		"antie/widgets/container",
		"antie/widgets/label",
		"antie/widgets/button",
		"antie/widgets/grid",
		"antie/widgets/verticallist",
		"antie/widgets/horizontallist"
	],
	function (Container, Label, Button, Grid, VerticalList, HorizontalList) {
		return Container.extend({
			init: function() {
				var self = this;

				this._super("numberselector");

				this.addClass("numberselector");

				var list = new VerticalList();

				this._grid = new Grid("numberGrid", 3, 3);

				for(var i = 0; i < 3; i++) {
					for(var j = 0; j < 3; j++) {
						var button = new Button();
						button.appendChildWidget(new Label(i*3 + j + 1));
						button.addClass("numberSelectorButton");
						this._grid.setWidgetAt(j, i, button);
					}
				}

				list.appendChildWidget(this._grid);

				var controlList = new HorizontalList("controlList");

				var backButton = new Button();
				backButton.appendChildWidget(new Label("Back"));
				backButton.addClass("numberSelectorButton");
				controlList.appendChildWidget(backButton);

				var clearButton = new Button();
				clearButton.appendChildWidget(new Label("Clear"));
				clearButton.addClass("numberSelectorButton");
				controlList.appendChildWidget(clearButton);

				list.appendChildWidget(controlList);

				this.appendChildWidget(list);

				this.addClass("hidden");
			},

			focus: function() {
				this._grid.getWidgetAt(1, 1).focus();
			},

      hideSelector: function(){
        var self = this;
        var device = window.getDevice();
        device.hideElement({
          el: self.outputElement,
          duration: 500,
          easing: 'easeOut'
        });
      },

      showSelector: function(){
        this.removeClass("hidden");
        var self = this;
        var device = window.getDevice();
        device.showElement({
          el: self.outputElement,
          duration: 500,
          easing: 'linear'
        });
        this.focus();
      }
		})
	}
);