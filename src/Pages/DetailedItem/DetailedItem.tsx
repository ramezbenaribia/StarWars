import { Card, CardContent, Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './DetailedItem.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormattedDate, FormattedNumber } from 'react-intl';

const DetailedItem = () => {
    const row = JSON.parse(localStorage.getItem('starship') || "")
    let keys = Object.keys(row);
    const non_Formatted_Attributes: string[] = [
        'model',
        'manufacturer',
        'max_atmosphering_speed',
        'consumables',
        'hyperdrive_rating',
        'starship_class',
        'url'
    ]
    const Dated_Attributes: string[] = [
        'created',
        'edited'

    ]
    const Number_Attributes: string[] = [
        'cost_in_credits',
        'length',
        'crew',
        'passengers',
        'cargo_capacity',
        'MGLT'
    ]
    const Array_Attributes: string[] = [
        'films',
        'pilots'
    ]


    return (
        <Container className='container' >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        <NavLink to="/" className="back_link" >
                            <ArrowBackIcon className='NPicon' />
                            Back
                        </NavLink>
                        <h1>
                            {row.name}
                        </h1>
                        {keys.map((item) =>
                            <div key={item} className="card_content"  >
                                {Array_Attributes.includes(item) &&
                                    <>
                                        <span className='key' >
                                            {item}:
                                        </span>
                                        {row[item].map((object: string) =>
                                            <div key={item} >
                                                • {object}
                                            </div>

                                        )}

                                    </>
                                }
                                {Dated_Attributes.includes(item) &&
                                    <>
                                        <span className='key' >
                                            {item}:
                                        </span>
                                        <FormattedDate
                                            value={row[item]}
                                        />
                                    </>
                                }
                                {Number_Attributes.includes(item) &&
                                    <>
                                        <span className='key' >
                                            {item}:
                                        </span>
                                        < FormattedNumber value={Number(row[item])} />
                                    </>
                                }

                                {non_Formatted_Attributes.includes(item) &&
                                    <>
                                        <span className='key' >
                                            {item}:
                                        </span>
                                        {row[item]}
                                    </>
                                }
                            </div>
                        )}
                    </Typography>
                </CardContent>

            </Card>
        </Container >

    )
}

export default DetailedItem