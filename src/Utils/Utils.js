//constants
import otherConstants from "Constants/OtherConstants";

// these are some of the utility functions exported for making the code more readable  

//find cost for the search item
export const findCost = ( data, searchItem ) =>
{
    let result = 0;
    for ( let i = 0; i < data.length; i++ )
    {
        let obj = data[i];
        if ( obj.type === searchItem )
        {
            result += obj.cost;
        }

    }
    return result;
};

//returns if data is present not
export const elementIncluded = ( source, data ) =>
{
    if ( source.includes( data ) ) return true;
    else return false;
};

//search condition while adding to cart
export const searchFromCartWhenAdding = ( item, data ) =>
{
    if ( item.id === data.id
        &&
        item.selectedSize === data.selectedSize
        &&
        item.selectedCrust === data.selectedCrust
        && JSON.stringify( item.toppings ) === JSON.stringify( data.toppings ) )
    {
        return true;
    }
    return false;
};

//search condition while removing from cart
export const searchFromCartWhenRemoving = ( item, data ) =>
{
    if ( item.id === data.id
        && item.selectedSize === data.selectedSize
        && item.selectedCrust === data.selectedCrust
        && item.toppings.length === 0
        && item.count >= 1 )
    {
        return [true, item.toppingCost];
    }
    else return [false, 0];
};

//looking for the toppings in the array
export const FindToppings = ( toppingState, toppingType, toppingArray, ) =>
{
    if ( toppingState )
    {
        let Count = 0;
        for ( let i = 0; i < toppingArray.length; i++ )
        {
            let obj = toppingArray[i];
            if ( obj.name === toppingType )
            {
                break;
            }
            else
            {
                Count++;
            }
        }
        if ( Count === toppingArray.length )
        {
            toppingArray.push(
                {
                    name: toppingType,
                    cost: otherConstants.EXTRA_COST
                }
            );
        }
    }
    return toppingArray;

};

//returns true if toppings included or not
export const toppingPresent = ( toppingArrayIndex, toppingType ) =>
{
    if ( toppingArrayIndex === toppingType )
    {
        return true;
    }
    return false;
}