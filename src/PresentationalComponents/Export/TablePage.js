import {
  BASE_URI,
  LAST_SEEN,
  NAME,
  RECOMMENDATIONS,
  TOTAL_RISK_CONSTANTS,
} from '../../AppConstants';
import PropTypes from 'prop-types';
import React from 'react';
import { t_global_background_color_200 } from '@patternfly/react-tokens';

export const TablePage = ({ systems, styles }) => {
  const header = [
    { value: NAME, style: styles.nameColumn },
    {
      value: RECOMMENDATIONS,
      style: { fontSize: 8, textAlign: 'center', width: '10px' },
    },
    {
      value: TOTAL_RISK_CONSTANTS.CRITICAL,
      style: { fontSize: 8, textAlign: 'center', width: '10px' },
    },
    {
      value: TOTAL_RISK_CONSTANTS.IMPORTANT,
      style: { fontSize: 8, textAlign: 'center', width: '10px' },
    },
    {
      value: TOTAL_RISK_CONSTANTS.MODERATE,
      style: { fontSize: 8, textAlign: 'center', width: '10px' },
    },
    {
      value: TOTAL_RISK_CONSTANTS.LOW,
      style: { fontSize: 8, textAlign: 'center', width: '10px' },
    },
    {
      value: LAST_SEEN,
      style: { fontSize: 8 },
    },
  ];
  const hitColumns = [
    'hits',
    'critical_hits',
    'important_hits',
    'moderate_hits',
    'low_hits',
  ];

  const headerBuilder = ({ value, style }) => (
    <th
      scope="col"
      className="pf-v6-c-table__th"
      style={{ ...style, ...styles.header, ...styles.bold }}
    >
      {value}
    </th>
  );
  const rowBuilder = ({ value }) => (
    <td className="pf-v6-c-table__td pf-m-no-padding" style={styles.row}>
      {value}
    </td>
  );
  const rows = [
    ...systems.map((system, idx) => {
      const [, date, month, year, time] = new Date(system.last_seen)
        .toUTCString()
        .split(' ');
      const sysDate = `${date} ${month} ${year}, ${time
        .split(':')
        .slice(0, 2)
        .join(':')} UTC`;

      const isOddRow = (idx + 1) % 2;
      const customStyle = {
        backgroundColor: t_global_background_color_200.var,
      };
      return (
        <tr
          key={`${system.display_name}`}
          className="pf-v6-c-table__tr"
          style={isOddRow ? customStyle : {}}
        >
          <td
            key={system.system_uuid}
            className="pf-v6-c-table__td pf-m-no-padding"
            style={{ ...styles.nameColumn, position: 'static' }}
          >
            <a
              style={styles.link}
              href={`${BASE_URI}/insights/advisor/systems/${system.system_uuid}/`}
            >
              {system.display_name}
            </a>
          </td>
          {...hitColumns.map((item) =>
            rowBuilder({
              value: system[item],
            }),
          )}
          <td
            key={system.last_seen}
            className="pf-v6-c-table__td pf-m-no-padding"
            style={{ ...styles.row, ...styles.lastSeenRow }}
          >{`${sysDate}`}</td>
        </tr>
      );
    }),
  ];

  // Plain elements with PatternFly's class names: a PDF is never interactive,
  // so it keeps the styling without the hooks PatternFly runs for every cell.
  return (
    <table
      aria-label={'export-table'}
      role="grid"
      className="pf-v6-c-table pf-m-grid-md pf-m-compact"
      data-ouia-component-type="PF6/Table"
      data-ouia-safe="true"
      data-ouia-component-id="export-table"
    >
      <thead className="pf-v6-c-table__thead">
        {header.map((colHeader) =>
          headerBuilder({ value: colHeader.value, style: colHeader.style }),
        )}
      </thead>
      <tbody role="rowgroup" className="pf-v6-c-table__tbody">
        {rows.map((row) => row)}
      </tbody>
    </table>
  );
};

TablePage.propTypes = {
  systems: PropTypes.object,
  page: PropTypes.number,
  styles: PropTypes.node,
};

export default TablePage;
