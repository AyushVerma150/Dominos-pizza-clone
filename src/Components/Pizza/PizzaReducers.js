//utility functions
import { findCost, elementIncluded } from 'Utils/Utils';

//constants
import otherConstants from 'Constants/OtherConstants';


//adding pizza size
export const pizzaSize = [
    {
        type: otherConstants.SIZE_SMALL,
        cost: otherConstants.COST_SMALL
    },
    {
        type: otherConstants.SIZE_MEDIUM,
        cost: otherConstants.COST_MEDIUM
    },
    {
        type: otherConstants.SIZE_LARGE,
        cost: otherConstants.COST_LARGE
    }
];

//adding crust type
export const crustType = [
    {
        type: otherConstants.BROWN_BREAD_CRUST,
        cost: otherConstants.BROWN_BREAD_COST
    }
    ,
    {
        type: otherConstants.THICK_CRUST,
        cost: otherConstants.THICK_CRUST_COST

    }
    ,
    {
        type: otherConstants.OREGANO_CRUST,
        cost: otherConstants.OREGANO_COST

    },
    {
        type: otherConstants.NEW_HAND_TOSSED_CRUST,
        cost: otherConstants.NEW_HAND_TOSSED_COST
    }
];

//cost for toppings
export const vegToppings = [
    {
        name: otherConstants.ONION_TOPPING,
        cost: otherConstants.TOPPING_COST
    },
    {
        name: otherConstants.CAPSICUM_TOPPING,
        cost: otherConstants.TOPPING_COST
    },
    {
        name: otherConstants.TOMATO_TOPPING,
        cost: otherConstants.TOPPING_COST
    },
    {
        name: otherConstants.CHEESE_TOPPING,
        cost: otherConstants.TOPPING_COST + otherConstants.EXTRA_COST
    },
    {
        name: otherConstants.JALAPENO_TOPPING,
        cost: otherConstants.TOPPING_COST
    }
]



//setting up initial state 
export const initialPizzaState = {
    pizzaTypes: [{
        id: 1,
        count: 0,
        toppings: [],
        added: false,
        toppingCost: 0,
        image: otherConstants.PIZZA_IMG,
        name: otherConstants.PIZZA_NAME,
        description: otherConstants.PIZZA_DESC,
        basePrice: otherConstants.PIZZA_BASE_COST,
        selectedSize: otherConstants.SIZE_MEDIUM,
        selectedCrust: otherConstants.NEW_HAND_TOSSED_CRUST,
    },
    {
        id: 2,
        count: 0,
        toppings: [],
        added: false,
        toppingCost: 0,
        image: otherConstants.PIZZA_IMG,
        name: otherConstants.PIZZA_NAME,
        description: otherConstants.PIZZA_DESC,
        basePrice: otherConstants.PIZZA_BASE_COST,
        selectedSize: otherConstants.SIZE_MEDIUM,
        selectedCrust: otherConstants.NEW_HAND_TOSSED_CRUST,
    },
    {
        id: 3,
        count: 0,
        toppings: [],
        added: false,
        toppingCost: 0,
        image: otherConstants.PIZZA_IMG,
        name: otherConstants.PIZZA_NAME,
        description: otherConstants.PIZZA_DESC,
        basePrice: otherConstants.PIZZA_BASE_COST,
        selectedSize: otherConstants.SIZE_MEDIUM,
        selectedCrust: otherConstants.NEW_HAND_TOSSED_CRUST,
    },
    {
        id: 4,
        count: 0,
        toppings: [],
        added: false,
        toppingCost: 0,
        image: otherConstants.PIZZA_IMG,
        name: otherConstants.PIZZA_NAME,
        description: otherConstants.PIZZA_DESC,
        basePrice: otherConstants.PIZZA_BASE_COST,
        selectedSize: otherConstants.SIZE_MEDIUM,
        selectedCrust: otherConstants.NEW_HAND_TOSSED_CRUST,
    },
    {
        id: 5,
        count: 0,
        toppings: [],
        added: false,
        toppingCost: 0,
        image: otherConstants.PIZZA_IMG,
        name: otherConstants.PIZZA_NAME,
        description: otherConstants.PIZZA_DESC,
        basePrice: otherConstants.PIZZA_BASE_COST,
        selectedSize: otherConstants.SIZE_MEDIUM,
        selectedCrust: otherConstants.NEW_HAND_TOSSED_CRUST,
    },
    {
        id: 6,
        count: 0,
        toppings: [],
        added: false,
        toppingCost: 0,
        image: otherConstants.PIZZA_IMG,
        name: otherConstants.PIZZA_NAME,
        description: otherConstants.PIZZA_DESC,
        basePrice: otherConstants.PIZZA_BASE_COST,
        selectedSize: otherConstants.SIZE_MEDIUM,
        selectedCrust: otherConstants.NEW_HAND_TOSSED_CRUST,
    }],
    masterData:
    {
        size: pizzaSize,
        crust: crustType,
        toppings: vegToppings
    }
};


export const changePizzaSizeReducer = ( state, action ) =>
{
    state.pizzaTypes.map( ( pizza, index ) =>
    {
        if ( pizza.id === action.payload.id )
        {
            //calculating cost for pizza as size is updated
            state.pizzaTypes[index].selectedSize = action.payload.size;
            let costOfCrust = findCost( crustType, action.payload.currentCrust );
            let costOfSize = findCost( pizzaSize, action.payload.size );
            state.pizzaTypes[index].basePrice = costOfCrust + costOfSize;
        }
    } );
}

export const ChangePizzaCrustReducer = ( state, action ) =>
{
    state.pizzaTypes.map( ( pizza, index ) =>
    {
        if ( pizza.id === action.payload.id )
        {
            //calculating cost for pizza as crust is updated
            state.pizzaTypes[index].selectedCrust = action.payload.crust;
            let costOfSize = findCost( pizzaSize, action.payload.currentSize );
            let costOfCrust = findCost( crustType, action.payload.crust );
            state.pizzaTypes[index].basePrice = costOfSize + costOfCrust;
        }
    } );
}

export const addCustomizationsReducer = ( state, action ) =>
{
    //fetching the customizations from the modal
    const addOns = action.payload.toppings;
    const pizzaId = action.payload.id;
    state.pizzaTypes.map( ( pizza, index ) =>
    {
        if ( pizza.id === pizzaId )
        {
            let totalCost = 0;
            state.pizzaTypes[index].toppingCost = 0;
            state.pizzaTypes[index].toppings = [];
            for ( let i = 0; i < addOns.length; i++ )
            {
                let obj = addOns[i];
                //adding the toppings if not included already
                if ( !elementIncluded( state.pizzaTypes[index].toppings, obj.name ) )
                {
                    state.pizzaTypes[index].toppings.push( obj.name );
                }
            }
            totalCost = state.pizzaTypes[index].toppings.length * otherConstants.TOPPING_COST;
            state.pizzaTypes[index].toppingCost += totalCost;

            //adding the cost for cheese which is higher than 15 by other toppings
            if ( elementIncluded( state.pizzaTypes[index].toppings, otherConstants.CHEESE_TOPPING ) )
            {
                state.pizzaTypes[index].toppingCost += otherConstants.EXTRA_COST;
            }
        }
    } );
}
