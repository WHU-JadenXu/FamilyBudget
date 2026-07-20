# 家庭记账

这是一个优先给 iPhone 使用的家庭记账网页。网页可以部署到 GitHub Pages，记账数据可以同步到 Supabase。

## 现在包含

- 支出 / 收入切换
- 记账人选择：👦 李逍宇、👧 徐佳丹
- 日期选择，默认使用上海时区的今天
- 支出用途：🙋 自己用、👦 李逍宇用、👧 徐佳丹用、👫 两个人共用
- 带 emoji 的大类 / 小类两级分类
- 本月支出、本月收入、两个人各自本月支出
- 最近记录列表
- 按记账人筛选
- 搜索记录：可按分类、备注、日期、金额、记账人搜索
- 编辑记录：点记录里的“编辑”，修改后保存
- 删除记录：点记录里的“删除”，本地和云端都会删除
- JSON 导入 / 导出
- Supabase 邮箱 + 密码登录云同步
- iPhone 主屏幕图标和独立打开模式配置

## 1. 创建 Supabase 项目

1. 打开 Supabase 并新建一个项目。
2. 进入项目后，打开 `SQL Editor`。
3. 把 `supabase-schema.sql` 里的内容复制进去运行。
4. 打开 `Project Settings > API`，复制：
   - Project URL
   - anon public key
5. 打开 `config.js`，填入：

```js
window.LEDGER_CONFIG = {
  SUPABASE_URL: "你的 Project URL",
  SUPABASE_ANON_KEY: "你的 anon public key",
  FAMILY_ID: "li-xu-family",
  SITE_URL: "你的 GitHub Pages 网址"
};
```

不要把 `service_role` key 放进网页里。

## 2. 配置登录

当前版本使用邮箱 + 密码登录，不依赖邮件登录链接，也不会被登录邮件限流卡住。

在 Supabase 后台打开 `Authentication > Users`，手动创建两个用户：

- 李逍宇的邮箱和密码
- 徐佳丹的邮箱和密码

创建时如果有 `Auto Confirm User` / `Confirm email` 之类的选项，请打开它。这样网页可以直接用邮箱和密码登录。

如果用户已经创建好了，但登录时报 `Email not confirmed`，请在 `Authentication > Users` 里把用户邮箱设为 confirmed，或者删掉重建并开启 Auto Confirm。

## 3. 添加家庭成员权限

到 Supabase 后台打开 `Authentication > Users`，复制两个人的 user id。

回到 SQL Editor，运行下面这段，把两个 user id 换成真实值：

```sql
insert into public.family_members (family_id, user_id, member_name)
values
  ('li-xu-family', 'PASTE_LI_USER_ID_HERE', '李逍宇'),
  ('li-xu-family', 'PASTE_XU_USER_ID_HERE', '徐佳丹')
on conflict (family_id, user_id) do update
set member_name = excluded.member_name;
```

完成后，两个人登录同一个网页，就会同步同一本账。

## 4. 用 GitHub Pages 发布

推荐两种方式：

1. 用户主页地址：创建仓库 `你的用户名.github.io`
   发布后网址是 `https://你的用户名.github.io/`

2. 项目地址：创建普通仓库，比如 `family-ledger`
   发布后网址通常是 `https://你的用户名.github.io/family-ledger/`

设置步骤：

1. 在 GitHub 新建一个公开仓库。
2. 上传这些文件：`index.html`、`styles.css`、`app.js`、`config.js`、`manifest.webmanifest`、`supabase-schema.sql`、`assets` 文件夹。
3. 进入仓库的 `Settings`。
4. 打开 `Pages`。
5. Source 选择 `Deploy from a branch`。
6. Branch 选择 `main`，文件夹选择 `/root`。
7. 保存后等 GitHub 自动发布。

注意：免费 GitHub Pages 适合公开仓库。代码和 Supabase anon key 会公开，这是正常的；真正保护数据的是 Supabase 的登录和 RLS 权限。

## 5. iPhone 使用方式

1. 用 iPhone Safari 打开 GitHub Pages 网址。
2. 点 Safari 的分享按钮。
3. 选择“添加到主屏幕”。

添加后，主屏幕上会出现“家庭记账”，打开时会更像一个轻量 App。

## 本地兜底

如果 `config.js` 还没填，或者暂时没登录，网页仍然可以本地记账。登录后点“同步”，会把本地记录上传到 Supabase。
