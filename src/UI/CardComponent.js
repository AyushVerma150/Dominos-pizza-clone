//lib imports
import { Card } from 'react-bootstrap';

//constants
import otherConstants from 'Constants/OtherConstants';

const CardComponent = ( props ) =>
{

    //card component is for both Pizza and Cart
    return (
        <Card className={props.class}>
            <Card.Img src={props.image}></Card.Img>
            <Card.Body>
                <Card.Title>
                    <strong>{props.title}</strong>
                </Card.Title>
                <Card.Text>
                    {props.desc.substr( 0, 100 )}
                </Card.Text>
                <Card.Text>
                    <strong>{otherConstants.SELECT_SIZE}</strong> :{props.size}
                </Card.Text>
                <Card.Text>
                    <strong>{otherConstants.SELECT_CRUST}</strong>:{props.crust}
                </Card.Text>
            </Card.Body>
            {
                props.children
            }
        </Card>
    )
};


export default CardComponent;