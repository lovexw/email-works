import { parseOneAddress } from 'email-addresses';
 
export default {
  async fetch(request, env) {
    if (request.method  === 'POST') {
      const formData = await request.formData(); 
      const email = formData.get('email'); 
      
      // 邮箱格式验证 
      const parsed = parseOneAddress(email);
      if (!parsed || parsed.type  !== 'mailbox') {
        return new Response('无效邮箱格式', { status: 400 });
      }
 
      // 存储到 KV（需先创建 KV 命名空间）
      await env.EMAIL_DB.put(Date.now().toString(),  email);
      
      // 可选邮件通知（参考[2]()中的邮件发送逻辑）
      // await sendNotification(email); 
      
      return new Response('成功提交');
    }
    return new Response('仅支持 POST 请求', { status: 405 });
  }
};
 
// 邮件通知函数示例 
async function sendNotification(email) {
  // 此处可集成类似[2]()的邮件发送逻辑 
  // 需要配置 SMTP 或使用邮件服务 API 
}
