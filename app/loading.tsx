import { Grid } from "components/common/grid/Grid";
import { Skeleton } from "components/common/skeleton/Skeleton";

const LoadingPage = () => (
  <Grid>
    <Skeleton square h={23} />
    <Skeleton h={23} />
    <Skeleton square />
    <Skeleton />
    <Skeleton square />
    <Skeleton square />
    <Skeleton />
    <Skeleton square />
    <Skeleton square />
    <Skeleton h={23} />
  </Grid>
);

export default LoadingPage;
