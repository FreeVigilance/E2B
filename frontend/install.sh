rm -rf .git/hooks
git lfs install
mv .git/hooks ./hooks
rm -rf node_modules/husky
npm install
