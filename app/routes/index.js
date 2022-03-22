import Goods from 'app/pages/goods';
import Home from 'app/pages/home';
import My from 'app/pages/home/my';
import Setting from 'app/pages/my/setting';

const routes = [
  {
    name: "Goods",
    component: Goods
  },{
    name: "Home",
    component: Home
  },{
    name: "My",
    component: My
  },{
    name: "Setting",
    component: Setting
  },
];

export default routes;
