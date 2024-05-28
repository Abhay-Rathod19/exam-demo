import React from 'react';
import { Link } from 'react-router-dom';
import { ExmButton } from './ExmButton';
import { objectKeys, ternary } from '../utils/javaScript';


export const ExmTableComponent = ({ objectArray }) => {


    if (objectArray[0]) {

        const column = objectKeys(objectArray[0]);
        // const column = Object.keys(objectArray[0]).slice(1);

        const headerArr = column?.map((item) => item?.toUpperCase()).concat('DETAILS');

        return (
            <>
                <table className='table-edit my-3'>
                    <thead>
                        <tr>
                            {
                                headerArr?.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <th>{item}</th>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            objectArray?.map((data, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            {
                                                column?.map((v, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <td>{ternary((typeof (data[v]) === 'object'), 'Answers', data[v])}</td>
                                                            {/* <td>{data[v]}</td> */}
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                            <td>
                                                <Link to={`/dashboard/StudentDetails?id=${data._id}`}>
                                                    <ExmButton sx={{ height: "25" }}>
                                                        View Details
                                                    </ExmButton>
                                                </Link>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>

                </table>
            </>
        )
    }
}