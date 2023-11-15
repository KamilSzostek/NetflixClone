import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IUser } from "@/helpers/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { planPriceSelector, setPrice, setName } from "@/store/plan";

export const useShowPageSignup = () => {
  const dispatch = useDispatch();
  const price = useSelector(planPriceSelector);
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem('newMember')
    const currentPath = router.asPath
    if (currentPath !== '/signup' && email) {
        fetch(`/api/users/${email}`).then(res => {
            if (res.status === 400){
                router.replace('/signup')
                return
            }
            else return res.json()
        }).then((user: IUser) => {
            console.log(user);
            if(user.plan.price === '' && currentPath !== '/signup/planform'){
                router.replace('/signup/planform') 
            }
            else if(user.isMembershipPaid && !currentPath.includes('configureAccount')){
                router.replace('/signup/configureAccount')
            }
            if(price != user.plan.price){
                dispatch(setPrice(user.plan.price))
                dispatch(setName(user.plan.name))
            }
        })
    }
    setShowPage(true) 
  }, []);
  return showPage;
};
