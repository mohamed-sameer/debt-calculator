/*jshint esversion: 6 */
//listen forsubmit
document.querySelector('#loan-form').addEventListener('submit',function(e) {
    //hide results
    document.querySelector('#result').style.display = 'none';

    //show loader
    document.querySelector('#loading').style.display = 'block';

    //set time out

    setTimeout(calculateResults, 700);
    e.preventDefault();
});

//calculate resuls function
function calculateResults() {
    const UiAmount = document.querySelector('#amount');
    const UiInterst = document.querySelector('#interst');
    const UiYears = document.querySelector('#years');
    const UiMonthlyPayment = document.querySelector('#monthly-payent');
    const UiTotalPayment = document.querySelector('#total-payent');
    const UiTotalInterst = document.querySelector('#total-interst');

    const principal = parseFloat(UiAmount.value);
    const calculatedInterst = parseFloat(UiInterst.value) / 100 / 12;
    const calculatedPyments = parseFloat(UiYears.value) * 12;
    
    //computing the monthly payment
    const x = Math.pow(1 + calculatedInterst, calculatedPyments);
    const monthly = (principal*x*calculatedInterst)/(x-1);

    if(isFinite(monthly)) {
        UiMonthlyPayment.value = monthly.toFixed(2);
        UiTotalPayment.value = (monthly * calculatedPyments).toFixed(2);
        UiTotalInterst.value = ((monthly *calculatedPyments) - principal).toFixed(2);

        //show results
        document.querySelector('#result').style.display = 'block';

        //hide loader
        document.querySelector('#loading').style.display = 'none';
    }else{
        showError('please check your number');
    }

}

//show error function
function showError(error) {
    //hide result
    document.querySelector('#result').style.display = 'none';

    //hide loader
    document.querySelector('#loading').style.display = 'none';
    //creat the UI
    const errorEl = document.createElement('div');

    //get elemnts from the dom
    const UiCard = document.querySelector('.card');
    const UiHeading = document.querySelector('.heading');
    
    //add bootstrap classes
    errorEl.className = 'alert alert-danger';

    //create text node and append it to the div
    errorEl.appendChild(document.createTextNode(error)); 

    //insert errorEl before heading
    UiCard.insertBefore(errorEl, UiHeading);

    //clear erroe after 2s
    setTimeout(clearError, 2000);
}

//clear erroe function
function clearError() {
    document.querySelector('.alert').remove();
}