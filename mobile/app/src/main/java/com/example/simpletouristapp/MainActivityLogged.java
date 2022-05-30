package com.example.simpletouristapp;

import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.widget.SearchView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.example.simpletouristapp.databinding.ActivityMainLoggedBinding;
import com.example.simpletouristapp.ui.home.FilterFragment;
import com.google.android.gms.auth.GoogleAuthException;
import com.google.android.gms.auth.GoogleAuthUtil;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.Scopes;
import com.google.android.gms.common.api.Scope;
import com.google.android.material.navigation.NavigationView;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.squareup.picasso.Picasso;

import org.json.JSONObject;

import java.io.IOException;

public class MainActivityLogged extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private ActivityMainLoggedBinding binding;
    private SearchView searchView;

    private ImageView imageView;
    private TextView name;
    private TextView email;
    public static GoogleSignInOptions gso;
    public static GoogleSignInClient gsc;

    SharedPreferences sharedPref;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainLoggedBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());


        gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestScopes(new Scope(Scopes.DRIVE_APPFOLDER))
                .requestServerAuthCode(getString(R.string.server_client_id))
                .requestIdToken(getString(R.string.server_client_id))
                .requestEmail()
                .build();

        gsc = GoogleSignIn.getClient(getApplicationContext(), gso);

        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(getApplicationContext());

//        GoogleAuthUtil.getToken(getApplicationContext(),account,"oauth2:" + Scopes.PLUS_LOGIN + " https://www.googleapis.com/auth/plus.profile.emails.read");

        setSupportActionBar(binding.appBarMainLogged.toolbarLogged);
        DrawerLayout drawer = binding.drawerLayoutLogged;
        NavigationView navigationView = binding.navViewLogged;
        View header = navigationView.getHeaderView(0);

        imageView = (ImageView) header.findViewById(R.id.imageView);
        name = (TextView) header.findViewById(R.id.name);
        email = (TextView) header.findViewById(R.id.email);

        if(account != null){
            String personName = account.getDisplayName();
            String personEmail = account.getEmail();
            Picasso.get().load(account.getPhotoUrl()).into(imageView);
            name.setText(personName);
            email.setText(personEmail);
            Log.w("name", account.getDisplayName());
            Log.w("email", account.getEmail());
            Log.w("photoUrl", String.valueOf(account.getPhotoUrl()));
            Log.w("GoogleId", account.getId());
            if(account.getIdToken() != null){
                Log.w("TokenId", account.getIdToken());
            }
            Log.w("Scope", String.valueOf(account.getRequestedScopes()));
            Log.w("AuthCode", account.getServerAuthCode());
        }
//        try {
//            String accessToken = GoogleAuthUtil.getToken(this,account.getAccount(),"audience:server:client_id:105995626849-6kds0s60a14t1d7hhtuhfopa81rk87fv.apps.googleusercontent.com");
//            Log.d("accessToken",accessToken);
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (GoogleAuthException e) {
//            e.printStackTrace();
//        }
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.

        sharedPref = getSharedPreferences("Token",Context.MODE_PRIVATE);

        String accessToken = sharedPref.getString("access_token","");
        String id = sharedPref.getString("id_customer","");
        Log.d("AccessToken",accessToken);
        Log.d("id_customer",id);

        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.nav_home, R.id.nav_domestic, R.id.nav_international, R.id.nav_news, R.id.nav_account)
                .setOpenableLayout(drawer)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main_activity_logged);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);




    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        MenuItem menuItem = menu.findItem(R.id.action_search);
        searchView = (SearchView) menuItem.getActionView();
        searchView.setQueryHint("Search here");
        SearchManager searchManager = (SearchManager) getSystemService(Context.SEARCH_SERVICE);
        searchView.setSearchableInfo(searchManager.getSearchableInfo(getComponentName()));
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String s) {
                Intent intent = new Intent(getApplicationContext(), SearchActivity.class);
                intent.putExtra("searchResult",s);
                startActivity(intent);
                return true;
            }

            @Override
            public boolean onQueryTextChange(String s) {
                return false;
            }
        });
        return super.onCreateOptionsMenu(menu);
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_search) {
            return true;
        }
        if(id == R.id.action_filter){
            FilterFragment filterFragment = new FilterFragment();
            filterFragment.show(getSupportFragmentManager(),"Filter");
        }

        return super.onOptionsItemSelected(item);
    }
    @Override
    public void onBackPressed() {
        // close search view on back button pressed
        if (!searchView.isIconified()) {
            searchView.setIconified(true);
            return;
        }
        super.onBackPressed();
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main_activity_logged);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        sharedPref.edit().clear();
    }
}