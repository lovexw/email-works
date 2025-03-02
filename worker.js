// worker.js  中直接实现验证 
function validateEmail(email) {{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email); 
}}
 
export default {{
  async fetch(request, env) {{
    if (request.method  === 'POST') {{
      const formData = await request.formData(); 
      const email = formData.get('email'); 
      
      if (!validateEmail(email)) {{
        return new Response('无效邮箱格式', {{ status: 400 }});
      }}
      
      await env.EMAIL_DB.put(Date.now().toString(),  email);
      return new Response('成功提交');
    }}
    return new Response('仅支持 POST 请求', {{ status: 405 }});
  }}
}};
