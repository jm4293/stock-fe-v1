import { useKisOauthTokenQuery } from '@/hooks/kis';
import { Button } from '@/components/button';
import axios from 'axios';
import { Loading } from '@/components/loading';

export const Stock = () => {
  const kisOauthTokenQuery = useKisOauthTokenQuery();

  return kisOauthTokenQuery.isSuccess ? (
    <div>
      <Button
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          axios
            .get(
              `https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price:FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=005930`,
              {
                headers: {
                  'Content-Type': 'application/json; charset=utf-8',
                  authorization: `${kisOauthTokenQuery.data}`,
                  appkey: `${import.meta.env.VITE_KIS_APP_KEY}`,
                  appsecret: `${import.meta.env.VITE_KIS_APP_SECRET}`,
                  tr_id: 'FHKST01010100',
                  custtype: 'P',
                },
              },
            )
            .then((res) => {
              console.log(res);
            });
        }}
        text="ddd"
      />
    </div>
  ) : (
    <Loading />
  );
};
