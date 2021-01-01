import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import "../../components/preview-collection/preview-collection.styles.scss";
import Spinner from "../../components/spinner/spinner.component";

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverView);
// const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

const CollectionOverViewContainer = lazy(() =>
  import("../../components/collection-overview/collection-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);
  // unsubscribeFromSnapshot = null;

  // componentDidMount() {
  //   this.props.fetchCollectionsStart();
  // const { updateCollections } = this.props;
  // const collectionRef = firestore.collection("collections");
  //obervable method
  // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
  //   async (snapshot) => {
  //     updateCollections(convertCollectionsSnapshotToMap(snapshot));
  //     this.setState({ loading: false });
  //   }
  // );
  //async method
  // collectionRef.get().then((snapshot) => {
  //   updateCollections(convertCollectionsSnapshotToMap(snapshot));
  //   this.setState({ loading: false });
  // });
  // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-fe8a2/databases/(default)/documents')
  // .then(response => response.json())
  // .then(collections => console.log(collections))
  // }

  // componentWillUnmount() {
  // this.unsubscribeFromSnapshot();
  // }
  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          // render={(props) => (
          //   <CollectionsOverviewWithSpinner
          //     isLoading={iscollectionFetching}
          //     {...props}
          //   />
          // )}
          component={CollectionOverViewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
