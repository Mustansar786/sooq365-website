import gql from 'graphql-tag';

export const CategoriesWhere = (whatYouWant, categoryId) => gql`query{category(id:"${categoryId}"){${whatYouWant}}}`;
export const Categories = (lang_code, whatYouWant) => gql`
    query {
        categories (lang_code:"${lang_code}") 
        {
            ${whatYouWant}
        }
    }`;
export const CategoriesWhere = (whatYouWant, categoryId) => gql`
    query {
        category(id:"${categoryId}")
        {
            ${whatYouWant}
        }
    }`;



export const getPriceRang = (categoryId) => gql`
    query { 
        getPriceRang(category:"${categoryId}")
        {  
            min 
            max 
            minMonthly 
            maxMonthly 
            minWeekly 
            maxWeekly 
        } 
    }`;

export const Brands = (category, whatYouWant) => gql`
    query { 
        brands(where: { category: "${category}" }) 
        { 
            ${whatYouWant} 
        } 
    }`;

export const Models = (brand, whatYouWant) => gql`
    query { 
        models(where: { brand: "${brand}" }) 
        { 
            ${whatYouWant}
        }
    }`;
