package com.example.simpletouristapp.ui.account;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import com.example.simpletouristapp.PayPalActivity;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.DetailHistoryBinding;
import com.example.simpletouristapp.model.HistoryTicketResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.squareup.picasso.Picasso;

import java.text.SimpleDateFormat;


public class DetailHistoryFragment extends Fragment {
    private DetailHistoryBinding binding;
    private HistoryTicketResponse.Ticket ticket;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            ticket = (HistoryTicketResponse.Ticket) getArguments().getSerializable("ticket");
        }
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = DetailHistoryBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        String pattern = "dd/MM/yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        binding.nameTour.setText(ticket.getTourName());
        binding.tvTimeDetail.setText(simpleDateFormat.format(ticket.getBookingDate()));
        binding.hotelName.setText(ticket.getHotelName());
        binding.numberPeople.setText(Integer.toString(ticket.getNumberPeople()));
        binding.tvPriceDetail.setText(Integer.toString(ticket.getPaymentPrice()));
        if (ticket.getStatus() == 0) {
            binding.btnPayment.setVisibility(View.VISIBLE);
            binding.btnCommentTour.setVisibility(View.GONE);
            binding.status.setText("Chưa thanh toán");
        } else {
            binding.btnPayment.setVisibility(View.GONE);
            binding.btnCommentTour.setVisibility(View.VISIBLE);
            binding.status.setText("Đã thanh toán");
        }
        try {
            Picasso.get().load(ToursApiService.BASE_URL + ticket.getImageAvatar().substring(7)).into(binding.image);

        } catch (Exception e) {
            Log.d("error", e.getMessage());
        }
        binding.btnDetailTour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("IdTour", ticket.getIdTour());
                Navigation.findNavController(view).navigate(R.id.action_nav_history_detail_to_nav_detail_tour, bundle);
            }
        });
        binding.btnCommentTour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("IdTour", ticket.getIdTour());
                bundle.putSerializable("Status", ticket.getStatus());
                Navigation.findNavController(view).navigate(R.id.action_nav_history_detail_to_nav_detail_tour, bundle);
            }
        });
        binding.btnPayment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getActivity(), PayPalActivity.class);
                intent.putExtra("ticket", ticket);
                getActivity().startActivity(intent);
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
