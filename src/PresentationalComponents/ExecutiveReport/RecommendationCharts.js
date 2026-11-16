import PropTypes from 'prop-types';
import React from 'react';
import { POUND_OF_RECS } from '../../AppConstants';
import { Text } from '@react-pdf/renderer';
import { ChartPie } from '@patternfly/react-charts/victory';
import { Flex, FlexItem } from '@patternfly/react-core';
import {
  t_global_text_color_status_danger_default,
  t_global_background_color_200,
  chart_color_red_orange_400,
  chart_color_orange_300,
  chart_color_yellow_300,
  chart_color_blue_300,
} from '@patternfly/react-tokens';

const RecommendationCharts = ({
  columnHeader,
  header,
  pieChart,
  pieLegend,
  rows,
}) => {
  return (
    <React.Fragment>
      <Text style={{ color: t_global_text_color_status_danger_default.value }}>
        {header}
      </Text>
      <Flex defaultspaceItems={{ default: 'spaceItemsLg' }}>
        <FlexItem style={{ width: '40%' }}>
          {/* Plain elements with PatternFly's class names: a PDF is never interactive,
              so it keeps the styling without the hooks PatternFly runs for every cell. */}
          <table
            aria-label={'recommendation-chart-table'}
            role="grid"
            className="pf-v6-c-table pf-m-grid-md pf-m-compact"
            data-ouia-component-type="PF6/Table"
            data-ouia-safe="true"
            data-ouia-component-id="recommendation-chart-table"
          >
            <thead className="pf-v6-c-table__thead">
              <tr className="pf-v6-c-table__tr">
                <th scope="col" className="pf-v6-c-table__th">
                  {columnHeader}
                </th>
                <th scope="col" className="pf-v6-c-table__th">
                  {POUND_OF_RECS}
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="pf-v6-c-table__tbody">
              {rows.map((item, index) => (
                <tr
                  key={`${columnHeader}-row-${index}`}
                  className="pf-v6-c-table__tr"
                  style={{
                    backgroundColor:
                      (index + 1) % 2 && t_global_background_color_200.value,
                    fontSize: '12px',
                  }}
                >
                  <td
                    className="pf-v6-c-table__td"
                    style={{ fontSize: '12px' }}
                  >
                    {item[0]}
                  </td>
                  <td
                    className="pf-v6-c-table__td"
                    style={{ fontSize: '12px' }}
                  >
                    {item[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FlexItem>
        <FlexItem
          alignSelf={{ default: 'alignSelfStretch' }}
          align={{ default: 'alignRight' }}
        >
          <ChartPie
            colorScale={[
              chart_color_red_orange_400.value,
              chart_color_orange_300.value,
              chart_color_yellow_300.value,
              chart_color_blue_300.value,
            ]}
            data={pieChart}
            legendData={pieLegend}
            legendOrientation="vertical"
            legendPosition="right"
            height={200}
            width={350}
            padding={{
              bottom: 20,
              left: 20,
              right: 140, // Adjusted to accommodate legend
              top: 20,
            }}
          />
        </FlexItem>
      </Flex>
    </React.Fragment>
  );
};

RecommendationCharts.propTypes = {
  columnHeader: PropTypes.string,
  header: PropTypes.string,
  pieChart: PropTypes.array,
  pieLegend: PropTypes.array,
  rows: PropTypes.array,
};

export default RecommendationCharts;
