import * as React from 'react';

interface IPlanTableProps {
}

const PlanTable: React.FunctionComponent<IPlanTableProps> = (props) => {
  return (                        <table>
    <thead>
        <tr>
            <td>Standard with ads</td>
            <td>Basic</td>
            <td>Standard</td>
            <td>Premium</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Monthly price</td>
            <td>€4,99</td>
            <td>€7,99</td>
            <td>€12,99</td>
            <td>€17,99</td>
        </tr>
        <tr>
            <td>Video quality</td>
            <td>Great</td>
            <td>Good</td>
            <td>Great</td>
            <td>Best</td>
        </tr>
        <tr>
            <td>Resolution</td>
            <td>1080p</td>
            <td>720p</td>
            <td>1080p</td>
            <td>4K+HDR</td>
        </tr>
        <tr>
            <td>Watch on your TV, computer, mobile phone and tablet</td>
            <td><FontAwesomeIcon icon={faCheck} /></td>
            <td><FontAwesomeIcon icon={faCheck} /></td>
            <td><FontAwesomeIcon icon={faCheck} /></td>
            <td><FontAwesomeIcon icon={faCheck} /></td>
        </tr>
        <tr>
            <td>Resolution</td>
            <td><FontAwesomeIcon icon={faMinus} /></td>
            <td><FontAwesomeIcon icon={faCheck} /></td>
            <td><FontAwesomeIcon icon={faCheck} /></td>
            <td><FontAwesomeIcon icon={faCheck} /></td>
        </tr>
    </tbody>
</table>);
};

export default PlanTable;
