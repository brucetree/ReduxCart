import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from "react-redux";
import {useEffect, Fragment} from "react";
import Notification from "./components/UI/Notification";
import {sendCartData,fetchCartData} from "./store/cart-actions";

let isInitial=true;

function App() {
    const dispatch=useDispatch();

    const showCart = useSelector(state => state.ui.cartIsVisible);
    const cart=useSelector(state=>state.cart);
    const notification =useSelector(state=>state.ui.notification);
    // when cart updated useEffect will rerender

    useEffect(()=>{
        dispatch(fetchCartData())
    },[dispatch])

    useEffect(()=>{

        // const sendCartData=async ()=>{
            // dispatch(uiActions.showNotification({
            //     status:'pending',
            //     title:'Sending...',
            //     message:'Sending cart data',
            // }))
            //
            // const response=await fetch("https://react-http-6b4a6.firebaseio.com/cart.json",{
            //     method:'PUT',
            //     body:JSON.stringify(cart),
            // });
            //
            // if(!response.ok){
            //     throw new Error('sending cart data failed');
            // }

            // const responseData=await response.json();

            // dispatch(uiActions.showNotification({
            //     status:'success',
            //     title:'Success',
            //     message:'Sent cart data successfully',
            // }))
        // };

        if(isInitial){
            isInitial=false;
            return;
        }

        if(cart.changed){
            //action creator
            dispatch(sendCartData(cart));
        }
        // sendCartData().catch((error)=>{
            // dispatch(
            //     uiActions.showNotification({
            //         status:'error',
            //         title:'Error',
            //         message:'Sending cart data failed',
            //     })
            // )
        // })


    },[cart,dispatch]);

    return (
        <Fragment>
            {notification && <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
            />}
        <Layout>
            {showCart&& <Cart/>}
            <Products/>
        </Layout>
        </Fragment>
    );
}

export default App;
