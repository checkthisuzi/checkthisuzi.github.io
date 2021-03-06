app.controller("CartController", function($scope,CartFactory,OrdersFactory,CustomersFactory,$location,$timeout) {
    $scope.cart = CartFactory.getCart();
    $scope.subTotal = CartFactory.getSubTotal();
    $scope.customers = CustomersFactory.getAllCustomers();
    $scope.customer;

    //show a modal with a select box to choose a customer
    $scope.chooseCustomer = function () {
        $("#customer-popup").modal('show');
    };
    //updates the when the product quantity in the shopping cart changes
    $scope.updateCart = function(){
        CartFactory.updateCart($scope.cart);
        $scope.subTotal = CartFactory.getSubTotal();
    };
    //called when a user places an order from the shopping cart
    $scope.placeOrder = function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = dd+'/'+mm+'/'+yyyy;
        var newOrder = {
                "products": $scope.cart,
                "subTotal": $scope.subTotal,
                "customer": $scope.customer,
                "orderStatus": "Completed",
                "date": today
            };
        OrdersFactory.placeOrder(newOrder);
        $("#customer-popup").modal('hide');
        CartFactory.clearCart();
        $timeout($scope.goHome(),1000);
    }
    $scope.removeFromCart = function(index){
        $scope.cart.splice(index,1);
        CartFactory.updateCart($scope.cart);
        $scope.subTotal = CartFactory.getSubTotal();
    }
    $scope.goHome = function(){
        $location.path("/home");
    }
});