var listController = (function() {
    var ListObj = function(title, description,id) {
        this.title = title;
        this.description = description;
        this.id = id;
    };

    var data = {
        listArr: []
    };

    return {
        addItem: function(title, description) {
            var newItem, ID;

            if(data.listArr.length > 0) {
                ID = data.listArr[data.listArr.length-1].id + 1;
            }
            else {
                ID = 0;
            }

            newItem = new ListObj(title,description,ID);

            
            data.listArr.push(newItem);


            return newItem; 
        },
        deleteItem: function(ID) {
            var index;
            var num = 0;
            var copy;
            
            data.listArr.forEach(function(element) { // for each OBJECT in the array
                if(ID == element.id) {
                    index = num;
                }
                else {
                    num++;
                }  
            })

            var deletedEl = data.listArr.splice(index,1);
            
            return data.listArr;

        }
    }

})();

var UIController = (function() {

        var DOMStrings = {
            inputTitle: '.add__title',
            inputDesc: '.add__description',
            inputBtn: '.add__btn',
            list: '.entered__list'
        };

        
        return {
            newInput: function() {
                return {
                    title: document.querySelector(DOMStrings.inputTitle).value,
                    description: document.querySelector(DOMStrings.inputDesc).value
                };
            },
            clearFields: function(title) {

                if(title === '') {

                }
                if(title !== '') {
                    document.querySelector(DOMStrings.inputTitle).value = '';
                    document.querySelector(DOMStrings.inputDesc).value = '';
                }
                

            },
            displayItem: function(obj) {
                var item, element;
                element = '.entered__list';

                html = '<div class = "item list" id = "list-%id%"><div class = "column item title">%title%</div><div class = "column item description">%description%</div><div class="column item delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';

                newHtml = html.replace('%id%',obj.id);
                newHtml = newHtml.replace('%description%', obj.description);
                newHtml = newHtml.replace('%title%', obj.title);
                
                document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            },
            deleteItem: function(selectorID) {
                var el = document.getElementById(selectorID);
                el.parentNode.removeChild(el);
            }
        
        };

})();

var controller = (function(listCtrl, UICtrl){
    var inputs;

    document.querySelector(".add__btn").addEventListener("click", function() {
        inputs = UICtrl.newInput();
        UICtrl.clearFields(inputs.title);
        if(inputs.title === '') {


        }
        else {

    
            var Item = listCtrl.addItem(inputs.title, inputs.description);
            UICtrl.displayItem(Item);
        }
    });
    
    document.querySelector(".entered__list").addEventListener("click", function() {
        var element = event.target.parentNode.parentNode.parentNode.id;
        elementSplit = element.split('-',2)[1];
        elementInt = parseInt(element);
        var deletedItem = listCtrl.deleteItem(element);
        UICtrl.deleteItem(element);

    });
})(listController, UIController);
