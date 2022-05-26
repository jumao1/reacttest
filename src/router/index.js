import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login/Login'
import Register from '../view/Register/Register'

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
		{
			path:'/register',
			name:'Register',
			component:Register
		},
    {
      path:'/home',
      name:'Home',
      component:()=>import("../view/Home/Home.vue"),
      children:[
        {
          path:'/books',
          name:'Books',
          component:()=>import('../view/Books/Books.vue')
        },
		{
			path:'/classify',
			name:'Classify',
			component:()=>import('../view/Classify/Classify.vue')
		},
		{
			path:'/test',
			name:'Test',
			component:()=>import('../view/Test/Test.vue')
		},
		{
			path:'/students',
			name:'Students',
			component:()=>import('../view/Students/Students.vue')
		},
		{
			path:'/personal',
			name:'Personal',
			component:()=>import('../view/Personal/Personal.vue')
		},{
			path:'/read',
			name:'Read',
			component:()=>import('../view/Read/Read.vue')
		},
		{
			path:'/borrowDetail',
			name:'BorrowDetail',
			component:()=>import('../view/BorrowDetail/BorrowDetail.vue')
		}
       ]
     },
   ]
 })
