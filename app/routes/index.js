import DetailDemo from 'app/pages/common/DetailDemo';
import ImageList from 'app/pages/common/imageList';
import Home from 'app/pages/home';
import Login from 'app/pages/login';
import My from 'app/pages/my';
import Setting from 'app/pages/my/setting';

const routes = [
  {
    name: "DetailDemo",
    component: DetailDemo
  },{
    name: "ImageList",
    component: ImageList
  },{
    name: "Home",
    component: Home
  },{
    name: "Login",
    component: Login
  },{
    name: "My",
    component: My
  },{
    name: "Setting",
    component: Setting
  },
];

export default routes;
