import bing from '../images/sites/bing.png';
import informationisbeautiful from '../images/sites/informationisbeautiful.png';
import nCoV2019 from '../images/sites/ncov2019.png';
import jhu from '../images/sites/jhu.png';

export const sites = [
  {
    name: 'John Hopkins CSSE',
    url: 'https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6',
    image: jhu
  },
  // {
  //   name: 'worldometer',
  //   url: 'https://www.worldometers.info/coronavirus/'
  // },
  {
    name: 'Bing COVID',
    url: 'https://bing.com/covid',
    image: bing
  },
  {
    name: 'COVID-19 Data Pack',
    url: 'https://informationisbeautiful.net/visualizations/covid-19-coronavirus-infographic-datapack/',
    image: informationisbeautiful
  },
  {
    name: 'nCoV2019',
    url: 'https://nCoV2019.live',
    image: nCoV2019
  }
];
