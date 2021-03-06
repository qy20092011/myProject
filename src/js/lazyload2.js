$(()=>{
	$('.top').load('top.html');
	$('.footer').load('footer.html');

	var datalist = document.querySelector('#datalist');
	var area = document.querySelector('.area')

	// 当前分页
	var pageNo = 1;

	// 每页显示数量
	var qty = 10;

	// 分页总数
	var pageLen;

	/*
		分页请求
			预加载
		api:http://localhost/myajax/ajax/api/football.php
	 */
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			var res = JSON.parse(xhr.responseText);
			var ul = document.createElement('ul');

			//计算分页数量
			pageLen = Math.ceil(res.total/qty);

			ul.innerHTML = res.data.map((item)=>{
				return `<li><div class="showPic"><a href=""><img src="${item.src}"></img></a></div><div class="showInfo"><div class="s-name">${item.s_name}</div><div class="s-unit"><span class="price">${item.price}</span><a href=""><i class="iconfont icon-gouwuchekong"></i></a>`
				// `
				// <li>
				// 	<img src="${item.src}"></img>
				// 	<p>${item.s_name}</p>
				// </li>
				// `
				
			}).join('');

			datalist.appendChild(ul);

			pageNo++;
		}
	}
	xhr.open('get','http://localhost/myproject/src/html/fresh.php?pageNo=' + pageNo,true);
	xhr.send();


	// 滚动加载更多
	window.onscroll = ()=>{
		// 如何判断滚动到底部？
		var scrollTop = window.scrollY;//document.body.scrollTop/document.documentElement.scrollTop
		//判断接近底部时
		if(scrollTop >= area.offsetHeight - window.innerHeight - 1000){
			if(pageNo<=pageLen){
				
				xhr.open('get','http://localhost/myproject/src/html/fresh.php?pageNo=' + pageNo,true);
				xhr.send();
			}
			
		}
	}

})