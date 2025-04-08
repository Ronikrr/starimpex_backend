import { AuthRoute } from './auth.route';
import { DashboardRoute } from './dashboard.route';
import { DiamondRoute } from './diamond.route';
import { DiamondSourceRoute } from './diamondSource.route';
import NotificationRoute from './notifications.route';
import { OrderRoute } from './order.route';
import { PurchaseRoute } from './purchase.route';
import { ReportRoute } from './report.route';
import { StatsRoute } from './stats.route';
import { SupportRoute } from './support.route';
import { UserRoute } from './user.route';

const adminRoutes = [
  new AuthRoute(),
  new UserRoute(),
  new DiamondSourceRoute(),
  new DiamondRoute(),
  new SupportRoute(),
  new OrderRoute(),
  new StatsRoute(),
  new DashboardRoute(),
  new NotificationRoute(),
  new PurchaseRoute(),
  new ReportRoute(),
];
export default adminRoutes;
