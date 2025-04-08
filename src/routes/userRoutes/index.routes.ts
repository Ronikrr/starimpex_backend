import { AuthRoute } from './auth.route';
import { UserCartRoute } from './cart.route';
import { DashboardRoute } from './dashboard.route';
import { DiamondRoute } from './diamond.route';
import { OrderRoute } from './order.route';
import { PriceTrackerRoute } from './priceTracker.route';
import { CustomerSupportRoute } from './support.route';
import { UserRoute } from './user.route';

const userRoutes = [
  new AuthRoute(),
  new CustomerSupportRoute(),
  new DiamondRoute(),
  new UserCartRoute(),
  new OrderRoute(),
  new DashboardRoute(),
  new PriceTrackerRoute(),
  new UserRoute(),
];
export default userRoutes;
