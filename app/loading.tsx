import { Grid } from "components/common/grid/Grid";
import { Skeleton } from "components/common/skeleton/Skeleton";

const LoadingPage = () => (
  <Grid>
    <Skeleton square />
    <Skeleton />
    <Skeleton square />
    <Skeleton />
    <Skeleton square />
    <Skeleton />
    <Skeleton />
    <Skeleton square />
    <Skeleton square />
    <Skeleton />
  </Grid>
);

export default LoadingPage;
