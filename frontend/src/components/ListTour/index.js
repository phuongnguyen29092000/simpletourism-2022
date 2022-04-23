import React from 'react';

function ListTour(props) {
    return (
        <div className='tour-manager'>
            <div className='tour-manager__listtour'>
                <table>
                    <thead>
                        <th>col1</th>
                        <th>col2</th>
                        <th>col3</th>
                        <th>col4</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTour;