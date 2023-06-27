// Function to calculate the total customer count
function calculateTotalCustomer(currentTotal, organicGrowth, saCount, saSaleSuccessCount, baseChurnRate, amCount, amCustomerChurnReduction, amLimit, suCount, suCSATPointIncrease, csatChurnDecrease) {
    // calculate additions
    let totalCustomersBeforeChurn =  organicGrowth + (saCount * saSaleSuccessCount) + currentTotal;
    
    // calculate the churn rate
    let amCustomers = amCount * amLimit; // amount of customers with an account manager
    let restCustomers = totalCustomersBeforeChurn - amCustomers; // customers without an account manager
  
    if (restCustomers < 0) {
      restCustomers = 0;
      amCustomers = currentTotal;
    }
  
    let newBaseChurnRate = baseChurnRate;
    if (suCount > 0) {
      newBaseChurnRate = calculateBaseChurnRate(suCount, suCSATPointIncrease, csatChurnDecrease, baseChurnRate);
    }
  
    let totalAmCustomers = amCustomers * (1 - calcRelativeChurnRate(baseChurnRate, amCustomerChurnReduction));
    let totalRestCustomers = restCustomers * (1 - newBaseChurnRate);
  
    return totalAmCustomers + totalRestCustomers;
  }
  
  // Function to calculate revenue
  function calculateRevenue(totalCustomers, coreProductCost, amCount, amLimit, amRevenueIncrease){
    let amCustomers = amCount * amLimit; // customers with an account manager
    let restCustomers = totalCustomers - amCustomers; // customers without an account manager
  
    if(restCustomers < 0) {
      restCustomers = 0;
      amCustomers = totalCustomers;
    }
  
    let totalAMRevenue = (amCustomers * coreProductCost) * (1 + amRevenueIncrease);
    let totalRestRevenue = restCustomers * coreProductCost;
  
    return totalAMRevenue + totalRestRevenue;
  }
  
  // Function to calculate relative churn rate
  function calcRelativeChurnRate(baseChurnRate, relativeChurnRate){
    let relativeReverse = 1 - relativeChurnRate;
    return baseChurnRate * relativeReverse;
  }
  
  // Function to calculate base churn rate
  function calculateBaseChurnRate(suCount, suCSATPointIncrease, csatChurnDecrease, baseChurnRate){
    let csatTotalPointIncrease = suCount * (suCSATPointIncrease * 100); 
    let newBaseChurnRate = baseChurnRate;
  
    for (let i =0; i < csatTotalPointIncrease; i++){
      newBaseChurnRate = calcRelativeChurnRate(newBaseChurnRate, csatChurnDecrease);
    }
  
    return newBaseChurnRate;
  }
  
  
  
  
  