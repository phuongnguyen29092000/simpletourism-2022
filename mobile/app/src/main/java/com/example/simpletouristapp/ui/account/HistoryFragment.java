package com.example.simpletouristapp.ui.account;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TableLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.MainActivityLogged;
import com.example.simpletouristapp.adapter.HistoryTicketAdapter;
import com.example.simpletouristapp.databinding.HistoryBinding;
import com.example.simpletouristapp.model.HistoryTicketResponse;
import com.example.simpletouristapp.service.AccountApiService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HistoryFragment extends Fragment {

    private HistoryBinding binding;
    private RecyclerView rvHistory;
    private AccountApiService accountApiService;
    private HistoryTicketAdapter historyTicketAdapter;
    private SharedPreferences sharedPreferences;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = HistoryBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        accountApiService = new AccountApiService();

        sharedPreferences = getActivity().getSharedPreferences("Token", Context.MODE_PRIVATE);

        rvHistory = binding.rvHistory;
        new MainActivityLogged().getAccessInfo();
        Call<HistoryTicketResponse> call = accountApiService.getHistoryTicket("Bearer " + sharedPreferences.getString("access_token",""),sharedPreferences.getString("id_customer",""));
        call.enqueue(new Callback<HistoryTicketResponse>() {
            @Override
            public void onResponse(Call<HistoryTicketResponse> call, Response<HistoryTicketResponse> response) {
                if(response.code() == 200){
                    HistoryTicketResponse historyTicketResponse = response.body();
                    historyTicketAdapter = new HistoryTicketAdapter(getContext(),historyTicketResponse.getTickets());
                    rvHistory.setLayoutManager(new LinearLayoutManager(getContext()));
                    rvHistory.setAdapter(historyTicketAdapter);
                }else {
                    Log.d("History Error", String.valueOf(response.code()));
                }
            }
            @Override
            public void onFailure(Call<HistoryTicketResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("History",t.getMessage());
            }
        });
        return root;

    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}
