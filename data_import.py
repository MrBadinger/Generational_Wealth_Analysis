import pandas as pd
import numpy as np
import pymongo

# csv file path
homeownership_csv = "Resources/Homeownership_Rate_by_State_Pcnt.csv"
bachelor_degree_csv = "Resources/Bachelors_Degree_or_Higher_by_State_Percent.csv"
hs_grad_csv = "Resources/High_School_Graduate_or_Higher_by_State_Percent.csv"
median_hh_income_csv = "Resources/Median_Household_Income_by_State_Current_Dollars.csv"
per_capita_income_csv = "Resources/Per_Capita_Personal_Income_by_State_Dollars.csv"
ttl_gdp_by_state_csv = "Resources/Total_Gross_Domestic_Product_by_State_Millions_of_Dollars.csv"

# Import the csv files into their respective dataframes
homeownership_df = pd.read_csv(homeownership_csv, encoding="utf-8")
bachelor_degree_df = pd.read_csv(bachelor_degree_csv, encoding="utf-8")
hs_grad_df = pd.read_csv(hs_grad_csv, encoding="utf-8")
median_hh_income_df = pd.read_csv(median_hh_income_csv, encoding="utf-8")
per_capita_income_df = pd.read_csv(per_capita_income_csv, encoding="utf-8")
ttl_gdp_by_state_df = pd.read_csv(ttl_gdp_by_state_csv, encoding="utf-8")

# set indexes to the state name
homeownership_df.set_index("Region Name", inplace = True)
bachelor_degree_df.set_index("Region Name", inplace = True)
hs_grad_df.set_index("Region Name", inplace = True)
median_hh_income_df.set_index("Region Name", inplace = True)
per_capita_income_df.set_index("Region Name", inplace = True)
ttl_gdp_by_state_df.set_index("Region Name", inplace = True)

state_metrics_list = []

year_range = np.arange(1984,2020)

for i in year_range:
    
    year = str(i)
    
    homeownership_series = homeownership_df[year]
    bachelor_degree_series = homeownership_df[year]
    
    for items in homeownership_series.iteritems(): 
        
        state_by_year_dict = {}
        
        state_by_year_dict['state'] = items[0]
        state_by_year_dict['year'] = i
        state_by_year_dict['homeownership rate'] = items[1]
        
        for items in bachelor_degree_series.iteritems():  
            state_by_year_dict['bachelor degree pcnt'] = items[1]
            state_metrics_list.append(state_by_year_dict )

print(state_metrics_list )