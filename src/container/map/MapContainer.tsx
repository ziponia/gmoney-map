import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useReducer,
  ReactNode,
  useRef,
} from "react";
import styled from "styled-components";
import { withRouter, useRouter } from "next/router";
import KakaoMap, { IMapsBasicInfo } from "../../components/maps/KakaoMap";
import KakaoMapContext from "../../components/maps/KakaoMapContext";
import { WithRouterProps } from "next/dist/client/with-router";
import ShopAPI from "../../api/ShopAPI";
import { IShopDocument } from "../../server/shop/shop.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../module";
import {
  setMarkers,
  setPopStatus,
  setLocation,
  setMapCenter,
} from "../../slices/store-slice";
import AbMarker from "../../components/maps/AbMarker";
import KakaoAPI from "../../api/KakaoAPI";
import Location from "../../components/maps/MapLocation";
import { RingLoader } from "react-spinners";
import media from "../../lib/styles/media";

export declare const kakao: any;

type Props = WithRouterProps & {
  onRender?: (map: any) => any;
  onClick?: () => void;
  children?: React.ReactNode;
};

const MapContainer: React.FC<Props> = (props) => {
  const router = useRouter();
  const mapCtx = useContext(KakaoMapContext);

  /**
   * 지도의 중심 좌표를 설정합니다.
   */
  // const [mapCenter, setMapCenter] = useState<{
  //   latitude: number;
  //   longitude: number;
  // }>({
  //   latitude: 37.2750552,
  //   longitude: 127.0072561,
  // });
  // const [currentMarker, setCurrentMarker] = useState<{
  //   lat: number;
  //   lng: number;
  //   imageSrc: string;
  // }>();

  const [loading, setLoading] = useState<boolean>(false);

  //스토어에 저장된 마커 불러오기
  const dispatch = useDispatch();
  const { Markers, currentMarker, mapCenter } = useSelector(
    (state: RootState) => state.store
  );

  // const [markers, setMarkers] = useState<IShopDocument[]>([]);

  /**
   * 지도의 zoom level 을 설정합니다.
   */
  const [mapZoom, setMapZoom] = useState<number>(3);

  const [center, setCenter] = useState({
    lat: 37.2750552,
    lng: 127.0072561,
  });

  const handleLocationChange = (map: IMapsBasicInfo) => {
    const lat = Number(map.latitude),
      lng = Number(map.longitude),
      zoom = map.zoom;

    setCenter({
      lat: lat,
      lng: lng,
    });
    // findByMapNearShop(lat, lng, category);
  };

  /**
   * test
   */
  const moveTest = (lat: number, lng: number) => {
    setMapCenter({
      latitude: lat,
      longitude: lng,
    });
  };

  useEffect(() => {
    /**
     * 현재 위/경도 좌표 기준으로, 상점 리스틀 받아옵니다.
     */
    if (!!center && center.lat && center.lng) {
      findByMapNearShop(
        center.lat,
        center.lng,
        router.query.category as string
      );
    }
  }, [center.lat, center.lng, router.query.category]);

  // 좌표로 주소받는 라이브러리 goecoder

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat: number = position.coords.latitude, // 위도
          lon: number = position.coords.longitude; // 경도

        dispatch(
          setLocation({
            lat: lat,
            lng: lon,
            imageSrc: "https://image.flaticon.com/icons/svg/1673/1673188.svg",
          })
        );

        // currentMarker({
        //   lat: lat,
        //   lng: lon,
        //   imageSrc: "https://image.flaticon.com/icons/svg/1673/1673188.svg",
        // });
        dispatch(
          setMapCenter({
            latitude: lat,
            longitude: lon,
          })
        );

        // setMapCenter({
        //   latitude: lat,
        //   longitude: lon,
        // });
      });
    }
  }, []);

  // useEffect(() => {
  //   dispatch(setLocation(currentMarker));
  // }, [currentMarker]);

  useEffect(() => {}, [router.query]);

  const findByMapNearShop = async (
    lat: number,
    lng: number,
    category?: string
  ) => {
    try {
      setLoading(true);

      // 데이터를 로딩하고 있다는 표시
      const { data } = await ShopAPI.search({
        lat,
        lng,
        distance: 500,
        category,
      });
      dispatch(setMarkers(data));
    } finally {
      setLoading(false);
    }

    // 데이터를 모두 완료했을때 로딩하고 있다는 표시를 제거
  };

  //좌표로 주소받는 api
  // const currentLocation = async (x: number, y: number) => {
  //   const { data } = await KakaoAPI.coord2address({ x, y });
  // };

  return (
    <Container>
      <KakaoMap
        render={props.onRender}
        zoom={mapZoom}
        maxLevel={12}
        onIdle={handleLocationChange}
        center={mapCenter}
      >
        {Markers.map((marker) => (
          <AbMarker
            onClick={props.onClick}
            key={marker._id}
            lat={marker.location.coordinates[1]}
            lng={marker.location.coordinates[0]}
            imageSrc="http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png"
            _id={marker._id}
            shopName={marker.CMPNM_NM}
            address={marker.REFINE_LOTNO_ADDR}
            address_R={marker.REFINE_ROADNM_ADDR}
            telNo={
              marker.TELNO === null ? "전화번호 미제공 업체" : marker.TELNO
            }
            onAbMarkerClose={() => marker._id}
            latMarker={marker.REFINE_WGS84_LAT}
            lngMarker={marker.REFINE_WGS84_LOGT}
            induty={marker.INDUTYPE_NM}
            use_br={
              marker.BRNHSTRM_MNY_USE_POSBL_YN === null
                ? ""
                : marker.BRNHSTRM_MNY_USE_POSBL_YN
            }
            use_ca={
              marker.CARD_MNY_USE_POSBL_YN === null
                ? ""
                : marker.CARD_MNY_USE_POSBL_YN
            }
            use_m={
              marker.MOBILE_MNY_USE_POSBL_YN === null
                ? ""
                : marker.MOBILE_MNY_USE_POSBL_YN
            }
          />
        ))}
        {/* 현재 내위치의 마커 */}
        {currentMarker && (
          <AbMarker
            lat={currentMarker.lat}
            lng={currentMarker.lng}
            imageSrc={currentMarker.imageSrc}
          />
        )}
      </KakaoMap>
      {loading === true && (
        <MaskComponentStyled>
          <RingLoader color="#10b592" />
          <p>주변 가맹점 탐색중...</p>
        </MaskComponentStyled>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  width: calc(100% - 380px);
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  flex: 1;
  left: 380px;
  ${media.small} {
    width: 100%;
    left: 0;
    top: 185px;
    height: calc(100vh - 185px);
  }
`;

const MaskComponentStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 20px;
    color: #10b592;
  }
`;

export default withRouter(MapContainer);
