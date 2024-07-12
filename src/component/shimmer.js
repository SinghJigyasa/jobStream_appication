import { Container, Grid, Skeleton } from "@mui/material";

const Shimmer = () => {
  return (
    <Container
      maxWidth={false}
      color="#212121"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container item xs={12} spacing={2}>
          {Array.from(new Array(12)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width="100%" height={400} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shimmer;
